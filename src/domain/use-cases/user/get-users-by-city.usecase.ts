import { PaginatedResponse } from "../../../shared/pagination";

import { UserEntity } from "../../entities";
import { UserRepository } from "../../repositories";

interface GetUsersByCityUseCase {
  execute: (city: string, page: number, limit: number) => Promise<PaginatedResponse<UserEntity>>;
}

export class GetUsersByCity implements GetUsersByCityUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(
    city: string,
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<UserEntity>> {
    const data = await this.userRepository.findByCity(city, page, limit);

    const lastPage = Math.ceil(data.length / limit);

    const hasMorePages = page < lastPage;

    const response: PaginatedResponse<UserEntity> = {
      last_page: lastPage,
      total_records: data.length,
      current_page: page,
      has_more_pages: hasMorePages,
      data,
    };

    return response;
  }
}
