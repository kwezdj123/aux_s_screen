export default {
	handleDynamicSql(id) {
		let sql = "SELECT a.id as id, a.device_id as deviceId, idat.alarm_type_name AS alarmTypeName,a.img_url as imgUrl,DATE_FORMAT(a.alarm_date, '%Y-%m-%d %H:%i') as alarmDate, "
		sql += "a.total_time AS totalTime,idat.alarm_level AS alarmLevel,a.device_name AS deviceName,a.alarm_level as handleLevel,a.address AS address "
		let joinTable = "FROM iot_algorithm_alarm a  LEFT JOIN iot_device_alarm_type idat ON a.alarm_type_id = idat.id "
		let condition = "WHERE a.isdeleted = '0' AND a.parent_id = 0 "
		sql = sql + joinTable + condition
		if (id) {
			sql += `AND a.alarm_type_id = ${id} ORDER BY a.alarm_date DESC LIMIT 10`
		}	else {
			sql += "ORDER BY a.alarm_date DESC LIMIT 10"
		}
		return sql
	},

	async getRightListData(){
		const types = await screen_point_right_type.run()
		if (!RightSelectType.model.selectType){
			RightSelectType.model.selectType = types[0].value	
		}
		console.log("RightSelectType.model.selectType",RightSelectType.model.selectType)
		const listData = await screen_point_right_list1.run({type:RightSelectType.model.selectType})
		return {
			"selectType":RightSelectType.model.selectType || types[0].value,
			"types": types,
			"listData":listData
		}
	}
}