export default {
	async getMapData(type) {
		let res = await screen_map.run({type:type})
		return res
	},
	async getEventList(begin,end){
		const start = moment().subtract('days',1).format("yyyy-MM-DD")
		const endd = moment().format("yyyy-MM-DD")
		let res = await screen_point_01.run({
			orgCode:"iot",
			beginTime:begin ?? start,
			endTime:end ?? endd
		})
		return res ? res.filter(item=>item.lonLat != null) : []
	}

}