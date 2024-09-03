export default {

	async getCentralData () {
		let res = await screen_point_central.run()
		let query1 = res[0]
		let query2 = res[1]
		let rate = 0
		if (query2.totalCount !== 0) {
			rate = (query2.totalCount - query2.unHandledCount) / query2.totalCount
		}
		return {
			"dataList":[
				{
					label: "接入视频数",
					value: query1.videoCount,
					unit: '个',
				},
				{
					label: "今日AI事件数",
					value: query2.totalCount,
					unit:'个'
				},
				{
					label: "待确定数",
					value: query2.unHandledCount,
					unit:'个'
				},
				{
					label: "已确定数",
					value: (query2.totalCount - query2.unHandledCount),
					unit:'个'
				},
				{
					label: "处理率",
					value:  rate * 100,
					unit:'%'
				},
			]
		}
	}
}