export interface ServerResponseOkay {
  stat_code: number;
  stat_msg: string;
  meta?: any;
}

export interface ServerResponseData<T> {
  stat_code: number;
  stat_msg?: string;
  data: T;
  meta?: any;
}

export interface ServerResponseError {
  stat_code: number;
  stat_msg?: string;
  meta?: any;
}

export type ServerStandardResposne<Data> =
  | ServerResponseOkay
  | ServerResponseError
  | ServerResponseData<Data>;
