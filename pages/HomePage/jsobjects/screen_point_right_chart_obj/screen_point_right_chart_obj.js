export default {

	async getSeries () {
		let option = {
			tooltip: {
				trigger: 'axis'
			},
			legend: {
				// data: algorithms.map(item => item.algorithmName),
				textStyle: {
					color: '#fff' // 红色
				}
			},
			grid: {
				left: '5%',
				right: '5%',
				bottom: '5%',
				containLabel: true
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				// data: results[0].map(item => item.x),
				axisLabel:{
					color:"#fff"
				}
			},
			yAxis: {
				type: 'value',
				axisLabel:{
					color:"#fff"
				}
			},
			series: []

		}

		const algorithms = await screen_point_right_binding.run()
		if(algorithms.length == 0)  return option
		option.legend.data = algorithms.map(item => item.algorithmName)

		const getAllData = algorithms.map(item => {
			const list = screen_point_right_chart.run({algorithmId: item.id})
			return list
		})
		const results = await Promise.all(getAllData)
		if (results.length == 0) return option

		const series = results.map((item, index) => {
			return {name: algorithms[index].algorithmName, list: item}
		})
		option.legend.data = results[0].map(item => item.x)
		option.series = series.map(item => {
			return {
				name: item.name,
				areaStyle: {},
				type: 'line', 
				stack: 'total', 
				data: item.list.map(data => data.y)
			}
		})
		return option
	}
}