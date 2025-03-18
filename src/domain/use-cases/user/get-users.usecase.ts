import { PaginatedResponse } from "../../../shared/pagination";

import { UserEntity } from "../../entities";
import { UserRepository } from "../../repositories";

interface GetUsersUseCase {
  execute: (page: number, limit: number) => Promise<PaginatedResponse<UserEntity>>;
}

export class GetUsers implements GetUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(page: number = 1, limit: number = 10): Promise<PaginatedResponse<UserEntity>> {
    const data = await this.userRepository.findAll(page, limit);

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
