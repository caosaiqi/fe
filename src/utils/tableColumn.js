export const getTimeTableColumn = ({ label = '时间' } = {}) => {
  return {
    label,
    width: 200,
    customRender({ row }) {
      const { start_time, end_time } = row
      return (
        <div style='line-height: 28px'>
          <span><i style='font-size: 16px;' class='txt-success iconfont icon-kaishishijian'></i> { start_time } </span>
          <br />
          <span><i style='font-size: 16px;' class='iconfont icon-jieshushijian txt-warning'></i> { end_time } </span>
        </div>
      )
    }
  }
}

