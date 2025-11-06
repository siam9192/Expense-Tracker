import { Prisma } from "@prisma/client";
import { calculatePagination } from "../../helpers/pagination.helper";
import prisma from "../../prisma-client";
import { PaginationOptions } from "../../types";
import { DEFAULT_AVATARS } from "../../utils/constant";
import { FilterAvatarsQuery } from "./avatar.interface";

class AvatarService {
  async seedAvatarsIntoDB() {
    const existingCount = await prisma.avatar.count({
      where: { is_default: true },
    });
    if (existingCount > 0) {
      return {
        success: false,
        message:
          "Default avatars already exist in the database — skipping creation.",
      };
    }

    await prisma.avatar.createMany({
      data: DEFAULT_AVATARS.map((_) => ({
        ..._,
        is_default: true,
      })),
      skipDuplicates: true,
    });

    return {
      success: true,
      message: `Inserted ${DEFAULT_AVATARS.length} default avatars successfully.`,
    };
  }

  async getPublicAvatarsFromDB(
    filterQuery: FilterAvatarsQuery,
    paginationOptions: PaginationOptions,
  ) {
    const { search_term } = filterQuery;
    const { page, skip, limit, sortBy, sortOrder } =
      calculatePagination(paginationOptions);
    const whereConditions: Prisma.AvatarWhereInput = {};
    if (search_term) {
      whereConditions.name = {
        contains: search_term,
        mode: "insensitive",
      };
    }

    const avatars = await prisma.avatar.findMany({
      where: whereConditions,
      skip,
      take: limit,
      orderBy: {
        [sortBy]: sortOrder,
      },
    });

    const total_results = await prisma.avatar.count({
      where: whereConditions,
    });

    const meta = {
      page,
      limit,
      total_results,
    };

    return {
      data: avatars,
      meta,
    };
  }
}

export default new AvatarService();
