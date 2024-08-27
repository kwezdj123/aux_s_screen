export default {
	
	obj: {
		"age": 18
	},

	testRightList() {
		return screen_point_right_list_obj.handleDynamicSql(177)
	},

	testPie () {
		return screen_point_left_obj.getLeftPieSql('month')
	},

	testBar() {
		return screen_point_left_obj.getLeftBarSql('month')
	},

	getAlertTitle(title){
		return title
	},

	testSearchSql() {
		return screen_point_left_search_obj.getSearchSql(0, "吧台","2024-07-24","2024-07-31 23:59:59")
	},

	async testList1() {
		const result = await screen_point_right_list1.run({type: 177})
		return result
	},
	
	async testApi() {
		 const result = await getVideo.run({deviceId: 3691})
		 return result
	},
	
	testChange() {
		this.obj.age = 19
	},
	
	print() {
		console.log('age', this.obj.age)
	}
}