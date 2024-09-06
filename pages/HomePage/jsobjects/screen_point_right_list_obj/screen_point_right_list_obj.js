export default {
	handleDynamicSql(id, pagesize, pagenum) {
		let sql = "SELECT a.id as id, a.device_id as deviceId, idat.alarm_type_name AS alarmTypeName,a.img_url as imgUrl,DATE_FORMAT(a.alarm_date, '%Y-%m-%d %H:%i') as alarmDate, "
		sql += "a.total_time AS totalTime,idat.alarm_level AS alarmLevel,a.device_name AS deviceName,a.alarm_level as handleLevel,a.address AS address, mspr.charge_person_name AS responsible, mspr.name AS destination,mspr.org_name AS orgName "
		let joinTable = "FROM iot_algorithm_alarm a LEFT JOIN iot_device_alarm_type idat ON a.alarm_type_id = idat.id LEFT JOIN model_safety_point_region_device msprd ON a.device_id = msprd.device_id AND msprd.isdeleted = '0' LEFT JOIN model_safety_point_region mspr ON msprd.region_id = mspr.id  AND mspr.isdeleted = '0'  LEFT join iot_device_org_link idol ON a.device_id = idol.device_id AND idol.isdeleted=0 "
		let condition = `WHERE a.isdeleted = '0' AND a.parent_id = 0 AND idol.org_code LIKE concat("${globalData.currentOrgCode}", "%") `
		sql = sql + joinTable + condition
		let pageStart = (pagenum - 1) * pagesize
		if (id) {
			sql += `AND a.alarm_type_id = ${id} ORDER BY a.alarm_date DESC LIMIT ${pageStart}, ${pagesize}`
		}	else {
			sql +=`ORDER BY a.alarm_date DESC LIMIT ${pageStart}, ${pagesize}`
		}
		return sql
	},

	async getRightListData(type,pagesize,pagenum,startTime,endTime){
		const types = await screen_point_right_type.run()
		console.log("type,pagesize",type,pagesize,pagenum,startTime,endTime)
		const listData = await screen_point_right_list.run(
			{
				type:type ?? types[0].value,
				pagesize:pagesize ?? 20,
				pagenum:pagenum ?? 1,
				startTime:startTime,
				endTime:endTime
			}
		)
		return {
			// "selectType":RightSelectType.model.selectType || types[0].value,
			"types": types,
			"listData":listData
		}
	},
	async getMoreRealTimeListData(type,pagesize,pagenum,startTime,endTime){
		const types = await screen_point_right_type.run()
		console.log("type,pagesize",type,pagesize,pagenum,startTime,endTime)
		const listData = await screen_point_right_list.run(
			{
				type:type ?? types[0].value,
				pagesize:pagesize ?? 20,
				pagenum:pagenum ?? 1,
				startTime:startTime,
				endTime:endTime
			}
		)
		return {
			// "selectType":RightSelectType.model.selectType || types[0].value,
			"types": types,
			"listData":listData
		}
	}
}