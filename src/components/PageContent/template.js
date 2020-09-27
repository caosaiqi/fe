import Vue from 'vue'
import PageContent from './index'
import _ from 'lodash'

export default function(config) {
  const {
    header,
    seachForm,
    table
  } = config
  const name = _.uniqueId('page-content-template')
  return Vue.extend({
    name,
    render() {
      return <PageContent header={header} seachForm={seachForm} table={table} />
    }
  })
}
