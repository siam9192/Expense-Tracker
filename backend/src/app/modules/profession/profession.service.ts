import { Prisma } from "@prisma/client";
import { calculatePagination } from "../../helpers/pagination.helper";
import prisma from "../../prisma-client";
import { PaginationOptions } from "../../types";
import { DEFAULT_PROFESSIONS } from "../../utils/constant";
import { FilterProfessionsQuery } from "./profession.interface";

class ProfessionService {
  async autoCreateProfessionsIntoDB() {
    const existingCount = await prisma.profession.count();
    if (existingCount > 0) {
      return {
        success: false,
        message:
          "Professions already exist in the database — skipping creation.",
      };
    }

    const professionData = DEFAULT_PROFESSIONS.map((name) => ({ name }));

    await prisma.profession.createMany({
      data: professionData,
      skipDuplicates: true,
    });

    return {
      success: true,
      message: `Inserted ${professionData.length} professions successfully.`,
    };
  }

  async getPublicProfessionsFromDB(
    filterQuery: FilterProfessionsQuery,
    paginationOptions: PaginationOptions,
  ) {
    const { search_term } = filterQuery;
    const { page, skip, limit, sortBy, sortOrder } =
      calculatePagination(paginationOptions);
    const whereConditions: Prisma.ProfessionWhereInput = {};
    if (search_term) {
      whereConditions.name = {
        contains: search_term,
        mode: "insensitive",
      };
    }

    const professions = await prisma.profession.findMany({
      where: whereConditions,
      skip,
      take: limit,
      orderBy: {
        [sortBy]: sortOrder,
      },
    });

    const total_results = await prisma.profession.count({
      where: whereConditions,
    });

    const meta = {
      page,
      limit,
      total_results,
    };

    return {
      data: professions,
      meta,
    };
  }
}

export default new ProfessionService();
