export default {
	async getMapData(type) {
		let res = await screen_map.run({type:type})
		return res
	},
	async getEventList(begin,end){
		let res = await screen_point_01.run({
			orgCode:"iot",
			beginTime:begin ?? '2024',
			endTime:end ?? '2100-01-01'
		})
		return res ?? []
	}

}