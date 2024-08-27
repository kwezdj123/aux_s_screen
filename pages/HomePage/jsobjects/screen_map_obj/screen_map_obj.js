export default {
	async getMapData() {
		let res = await screen_map.run()
		return {
			dataList:res,

		}
	}
}