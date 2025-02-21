/*
 * Copyright 2018-2023 Elyra Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { RequestHandler } from './requests';
import { IContentsPropertiesResource } from './types';

const ELYRA_FILE_PARSER_API_ENDPOINT = 'elyra/contents/properties/';

/**
 * An interface for typing json dictionaries in typescript
 */
export interface IDictionary<T> {
  [key: string]: T;
}

/**
 * A utilities class for parsing notebook files.
 */
export class ContentParser {
  /**
   * Takes in a file_path and finds all env vars accessed in that file.
   * @param file_path - relative path to file
   * @returns A string array of the env vars accessed in the given file
   */
  static async getEnvVars(file_path: string): Promise<string[]> {
    try {
      const response =
        await RequestHandler.makeGetRequest<IContentsPropertiesResource>(
          ELYRA_FILE_PARSER_API_ENDPOINT + file_path
        );
      // Only return environment var names (not values)
      return Object.keys(response?.env_vars ?? {});
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
