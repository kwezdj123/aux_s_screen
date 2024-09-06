export default {
	getLeftPieSql(type) {
		const code = globalData.currentOrgCode
		let columns = 'SELECT count(1) as `y`, b.alarm_type_name as `x`, b.id as typeId '
		let table = 'FROM iot_algorithm_alarm a LEFT JOIN iot_device_alarm_type b ON a.alarm_type_id = b.id and b.isdeleted = 0 LEFT join iot_device_org_link idol ON a.device_id = idol.device_id AND idol.isdeleted=0 '
		let condition = `WHERE a.isdeleted = 0 AND a.parent_id = 0 AND idol.org_code LIKE concat("${code}", "%") `
		let concatSql = ''
		if (type === 'month') {
			concatSql = "'%Y-%M'"
		} else if (type === 'year') {
			concatSql = "'%Y'"
		}
		let dynamic = `AND DATE_FORMAT(a.alarm_date, ${concatSql}) = DATE_FORMAT(NOW(), ${concatSql})  GROUP BY b.id`
		return columns + table + condition + dynamic
	},

	async getLeftPie() {
		const result = await screen_point_left_pie.run()
		console.log("getLeftPie result",result)
		// return {
		// "dataList": result
		// }

		return result.map(item=>{
			return {
				x:item.name,
				y:item.value
			}
		})
	},

	getLeftBarSql(type) {
		const code = globalData.currentOrgCode
		if (type === 'month') {
			return `SELECT count(1) as y, DATE_FORMAT(a.alarm_date, '%m月%d日') as x FROM iot_algorithm_alarm a LEFT join iot_device_org_link idol ON a.device_id = idol.device_id AND idol.isdeleted='0' WHERE a.isdeleted = 0 AND a.parent_id = 0 AND DATE_FORMAT(a.alarm_date, '%Y-%m') = DATE_FORMAT(NOW(), '%Y-%m') AND idol.org_code LIKE concat('${code}', '%') GROUP BY DATE_FORMAT(a.alarm_date, '%Y-%m-%d')`
		} else if (type === 'year') {
			return `SELECT count(1) as y, DATE_FORMAT(a.alarm_date, '%m月') as x FROM iot_algorithm_alarm a LEFT join iot_device_org_link idol ON a.device_id = idol.device_id AND idol.isdeleted='0'   WHERE a.isdeleted = 0 AND a.parent_id = 0 AND DATE_FORMAT(a.alarm_date, '%Y') = DATE_FORMAT(NOW(), '%Y') AND idol.org_code LIKE concat('${code}', '%') GROUP BY DATE_FORMAT(a.alarm_date, '%Y-%m')`
		} else {
			return ""
		}
	},

	async getLeftBar() {
		const result = await screen_point_left_bar.run()

		// return {
		// "dataList": result
		// }
		return result.map(item=>{
			return {
				x:item.label,
				y:item.value
			}
		})
	},

	async getLeftChart() {
		const bar = await screen_point_left_bar.run()
		const pie = await screen_point_left_pie.run()
		return {
			barList: bar,
			pieList: pie
		}
	}
}