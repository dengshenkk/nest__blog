export enum ErrorCode {
  // 系统
  SUCCESS = 0,
  /**
   * 参数无效
   */
  PARAM_INVALID = 40000,
  /**
   * 数据已存在
   */
  DATA_EXISTS = 50000,
  /**
   * 该数据不存在
   */
  DATA_NOT_EXISTS = 50001,
  // 具体业务错误码
}
