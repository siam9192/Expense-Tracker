import axios from "axios";
import prisma from "../../prisma-client";
import { PaginationOptions } from "../../types";
import { Prisma } from "@prisma/client";
import { calculatePagination } from "../../helpers/pagination.helper";
import { FilterCountriesQuery } from "./country.interface";

class CountryService {
  async seedCountriesIntoDB() {
    // 1️⃣ Check if countries already exist
    const existingCount = await prisma.country.count();
    if (existingCount > 0) {
      return {
        success: false,
        message: "Countries already exist in the database — skipping creation.",
      };
    }

    // 2️⃣ Fetch countries from API
    const { data } = await axios.get(
      "https://restcountries.com/v3.1/all?fields=name,cca2,flags",
    );

    // 3️⃣ Map data to your model
    const countries = data.map((country: any) => ({
      name: country.name?.common || "Unknown",
      code: country.cca2 || "",
      flag_png: country.flags?.png || "",
      flag_svg: country.flags?.svg || "",
    }));

    // 4️⃣ Insert all (skip duplicates just in case)
    await prisma.country.createMany({
      data: countries,
      skipDuplicates: true,
    });

    return {
      success: true,
      message: `Inserted ${countries.length} countries successfully.`,
    };
  }

  async getPublicCountriesFromDB(
    filterQuery: FilterCountriesQuery,
    paginationOptions: PaginationOptions,
  ) {
    const { search_term } = filterQuery;
    const { page, skip, limit, sortBy, sortOrder } =
      calculatePagination(paginationOptions);
    const whereConditions: Prisma.CountryWhereInput = {};
    if (search_term) {
      whereConditions.OR = [
        {
          name: {
            contains: search_term,
            mode: "insensitive",
          },
        },
        {
          code: {
            contains: search_term,
            mode: "insensitive",
          },
        },
      ];
    }

    const countries = await prisma.country.findMany({
      where: whereConditions,
      skip,
      take: limit,
      orderBy: {
        [sortBy]: sortOrder,
      },
    });

    const total_results = await prisma.country.count({
      where: whereConditions,
    });

    const meta = {
      page,
      limit,
      total_results,
    };

    return {
      data: countries,
      meta,
    };
  }
}

export default new CountryService();
