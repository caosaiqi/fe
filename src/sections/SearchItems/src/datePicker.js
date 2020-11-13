
import _ from 'lodash'
import dayjs from 'dayjs'

const timeFormat = 'yyyy-MM-DD HH:mm:ss'
const dateFormat = 'yyyy-MM-DD'
const defaultFormats = {
  date: dateFormat,
  datetime: timeFormat,
  datetimerange: timeFormat
}

const defaultKey = {
  date: 'date',
  datetime: ['start_time', 'end_time'],
  datetimerange: ['start_time', 'end_time']
}

const defaultType = 'datetimerange'

export default ({ label = '日期', id, props = {}, on = {}} = {}) => {
  const _id = _.uniqueId('_searchDatePiker')
  const _props = Object.assign({
    type: defaultType,
    align: 'right',
    placeholder: '请选择日期',
    startPlaceholder: '请选择开始日期',
    endPlaceholder: '请选择结束日期'

  }, props)

  _props.format = props.format || defaultFormats[_props.type]

  const handleChange = (date, setModel) => {
    const keys = id || defaultKey[_props.type]
    const format = _props.format.replace('yyyy', 'YYYY')
    if (_.isString(keys)) {
      const strDate = dayjs(date).format(format)
      setModel({
        id: keys,
        value: strDate
      })
    }

    if (_.isArray(date) && _.isArray(keys)) {
      date.forEach((item, index) => {
        const strDate = dayjs(item).format(format)
        setModel({
          id: keys[index],
          value: strDate
        })
      })
    }
  }

  return {
    label,
    id: _id,
    customRender(model, { setModel }) {
      return (
        <el-date-picker
          v-model={model[_id]}
          onChange = {(value) => handleChange(value, setModel)}
          {...{ props: _props }}
        />
      )
    }
  }
}
