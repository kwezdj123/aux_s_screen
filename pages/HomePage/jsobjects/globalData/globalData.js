export default {
	backgroundColor:"#18181b",
	eventHistory:[],
	//事件弹框视频地址
	currentVideoURL:"",
	async getEventHistory(deviceId,pagesize,pagenum,startTime,endTime,deviceName){
		console.log("getHistory deviceId",deviceId)
		// this.history = data
		pagenum = pagenum ?? 1
		pagesize = pagesize ?? 10
		const data = await screen_point_history.run({
			deviceId:deviceId,
			pagesize:pagesize,
			pagestart:(pagenum-1)*pagesize,
			startTime:startTime,
			endTime:endTime,
			deviceName:deviceName || ''
		})
		console.log("getHistory data",data)
		this.eventHistory = data
		return data
	},
	//左侧播放视频地址列表
	videoList:[],
	async getVideosUrlList(points){
		let tempList = []
		for(let point of points){
			await getVideo.run({deviceId:point.id}).then(res=>{
				console.log("getVideoURL",res)
				point.videoURL = `https://test.superton.cn/videoplayer/?url=${encodeURIComponent(res.data)}`
				tempList.push(point)
			})
		}
		this.videoList = tempList
	},
	getVideoURL(deviceId){
		console.log("getVideoURL deviceId",deviceId)
		getVideo.run({deviceId:deviceId}).then(res=>{
			console.log("getVideoURL",res)
			this.currentVideoURL = res.data
		})
	},
	//选中点位，在地图上显示
	currentLocationData:'',
	setCurrentLocationData(data){
		this.currentLocationData = data
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