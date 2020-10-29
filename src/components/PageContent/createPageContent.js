import Vue from 'vue'
import PageContent from './index'
import _ from 'lodash'

export default function(config) {
  const name = _.uniqueId('page-content-template')
  return Vue.extend({
    name,
    data() {
      return config
    },
    render() {
      return <PageContent
        headerContent={this.headerContent}
        searchContent={this.searchContent}
        tableContent={this.tableContent} />
    }
  })
}
