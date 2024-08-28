export default {
	async getMapData() {
		let res = await screen_map.run()
		return {
			dataList:res,

		}
	},
	async getEventList(begin,end){
		let res = await screen_point_01.run({
			orgCode:"iot",
			beginTime:begin || '',
			endTime:end || ''
		})
		return res
	}
}