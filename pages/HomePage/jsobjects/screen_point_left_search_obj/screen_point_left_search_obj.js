export default {

	getSearchSql(selectType, name, startTime, endTime) {
		const code = globalData.currentOrgCode
		let columnSql = "SELECT a.id AS id,a.name AS name,a.lon_lat AS lonLat,a.state AS state "
		if (startTime && endTime) {
			columnSql += `,(SELECT COUNT(DISTINCT t.id) FROM iot_algorithm_alarm t WHERE t.isdeleted = 0 AND t.device_id = a.id AND DATE_FORMAT(t.createdate,'%Y-%m-%d') BETWEEN '${startTime}' AND '${endTime}') AS warningRecord `
		}
		let tableSql = "FROM `iot_device` a LEFT JOIN iot_product b ON a.product_id = b.id AND b.isdeleted = 0 LEFT JOIN iot_product_link c ON c.product_id = b.id AND c.isdeleted = 0 LEFT JOIN iot_product_category d ON b.product_category_id = d.id AND d.isdeleted = 0 "
		if (selectType == 0) {
			tableSql += "LEFT JOIN iot_algorithm_link ial ON a.id = ial.device_id AND ial.isdeleted = 0 "
		}
		let selectSql = selectType == 0 ? 'AND ial.id IS NOT NULL' : ''
		let concatSql = name ? ` AND a.name LIKE "%${name}%"` : ' '
		let conditionSql = `WHERE a.isdeleted = 0 AND d.code = 'camera' ${selectSql} ${concatSql} AND c.org_code LIKE concat('${code}', '%')  GROUP BY a.id`
		return columnSql + tableSql + conditionSql
	},

	async getLeftSearchList() {
		let res = await screen_point_left_search.run()
		return {
			type:LeftTopList.model.type || 0,
			keyword:LeftTopList.model.keyword || '',
			dataList:res
		}
	}
}