import Vue from 'vue'
import PageContent from './index'
import _ from 'lodash'

export default function({ headerContent, searchContent, tableContent }) {
  const name = _.uniqueId('page-content-template')
  return Vue.extend({
    name,
    data() {
      return {
        headerContent,
        searchContent,
        tableContent
      }
    },
    render() {
      return <PageContent
        headerContent={this.headerContent}
        searchContent={this.searchContent}
        tableContent={this.tableContent} />
    }
  })
}
