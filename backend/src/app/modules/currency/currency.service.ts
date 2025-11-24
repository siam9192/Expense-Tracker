import axios from "axios";
import prisma from "../../prisma-client";
import { FilterCountriesQuery } from "../country/country.interface";
import { PaginationOptions } from "../../types";
import { calculatePagination } from "../../helpers/pagination.helper";
import { Prisma } from "@prisma/client";

class CurrencyService {
  async seedCurrenciesIntoDB() {
    // 1️⃣ Check if currencies already exist

    const existingCount = await prisma.currency.count();
    if (existingCount > 0) {
      return {
        success: false,
        message:
          "Currencies already exist in the database — skipping creation.",
      };
    }

    // 2️⃣ Fetch currencies from REST Countries API
    const { data } = await axios.get(
      "https://restcountries.com/v3.1/all?fields=currencies",
    );

    // 3️⃣ Extract unique currencies
    const currencyMap: Record<string, { name: string; symbol: string }> = {};

    data.forEach((country: any) => {
      if (country.currencies) {
        for (const [code, info] of Object.entries(country.currencies)) {
          currencyMap[code] = info as any;
        }
      }
    });

    const currencies = Object.entries(currencyMap)
      .map(([code, info]) => ({
        code,
        name: info.name,
        symbol: info.symbol,
      }))
      .filter((_) => _.symbol !== undefined);

    // 4️⃣ Bulk insert
    await prisma.currency.createMany({
      data: currencies,
      skipDuplicates: true,
    });

    return {
      success: true,
      message: `Inserted ${currencies.length} currencies successfully.`,
    };
  }
  async getPublicCurrenciesFromDB(
    filterQuery: FilterCountriesQuery,
    paginationOptions: PaginationOptions,
  ) {
    const { search_term } = filterQuery;
    const { page, skip, limit, sortBy, sortOrder } = calculatePagination(
      paginationOptions,
      {
        defaultSortBy: "name",
      },
    );
    const whereConditions: Prisma.CurrencyWhereInput = {};
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

    const currencies = await prisma.currency.findMany({
      where: whereConditions,
      skip,
      take: limit,
      orderBy: {
        [sortBy]: sortOrder,
      },
    });

    const total_results = await prisma.currency.count({
      where: whereConditions,
    });

    const meta = {
      page,
      limit,
      total_results,
    };

    return {
      data: currencies,
      meta,
    };
  }
}

export default new CurrencyService();
