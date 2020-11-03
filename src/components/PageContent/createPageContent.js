import Vue from 'vue'
import PageContent from './index'

export default function({ headerContent, searchContent, tableContent }) {
  return Vue.extend({
    name: 'PageContentTemplate',
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
