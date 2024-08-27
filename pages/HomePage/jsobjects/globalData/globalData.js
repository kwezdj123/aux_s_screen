export default {
	backgroundColor:"#18181b",
	eventHistory:[],
	currentVideoURL:"",
	async getEventHistory(deviceId){
		console.log("getHistory deviceId",deviceId)
		// this.history = data
		const data = await screen_point_history.run({deviceId:deviceId})
		console.log("getHistory data",data)
		this.eventHistory = data
	},
	getVideoURL(deviceId){
		console.log("getVideoURL deviceId",deviceId)
		getVideo.run({deviceId:deviceId}).then(res=>{
			console.log("getVideoURL",res)
			this.currentVideoURL = res.data
		})
	},
	yujingList:[
		{
			title: "本日",
			range: [
				moment().format("yyyy-MM-DD"),
				moment().format("yyyy-MM-DD") + " 23:59:59"
			],
			isSelected: true
		},
		{
			title: "近7天",
			range: [
				moment()
				.subtract(1, "weeks")
				.format("yyyy-MM-DD"),
				moment().format("yyyy-MM-DD") + " 23:59:59"
			],
			isSelected: false
		},
		{
			title: "近30天",
			range: [
				moment()
				.subtract(1, "months")
				.format("yyyy-MM-DD"),
				moment().format("yyyy-MM-DD") + " 23:59:59"
			],
			isSelected: false
		}
	],
	shipinList: [
		{
			title: "分析点位",
			isSelected: true
		},
		{
			title: "接入点位",
			isSelected: false
		}
	]
}