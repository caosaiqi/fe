import Vue from 'vue'
import PageContent from './index'
import _ from 'lodash'

export default function(config) {
  const {
    headerContent,
    searchContent,
    tableContent
  } = config
  const name = _.uniqueId('page-content-template')
  return Vue.extend({
    name,
    render() {
      return <PageContent
        headerContent={headerContent}
        searchContent={searchContent}
        tableContent={tableContent} />
    }
  })
}
