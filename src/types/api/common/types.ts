export type QueryParams = Record<
  string,
  string | number | boolean | null | undefined
>;

export interface RequestOptions {
  // Authorization: Bearer <access_token> — domyślnie true
  auth?: boolean;
  // X-Refresh-Token — tylko automatically_login
  refreshToken?: boolean;
  // X-Contact-Token — tylko publiczny formularz kontaktowy
  contactToken?: string;
  query?: QueryParams;
}
