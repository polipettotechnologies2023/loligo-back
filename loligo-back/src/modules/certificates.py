# TODO: this module need to change and need to retrieve data from jira

# def get_my_certificates(data):
#     jsonized_results = []
#     try:
#         open_db = db_open()
#         if open_db == True:
#             sql = f"SELECT * FROM certificates WHERE userId = '{data.user_id}'"
#             results = get_db_data(sql)

#             for result in results:
#                 dict = {
#                         'certificate_id' : result[0],
#                         'user_id': result[1],
#                         'ticket_id': result[2]
#                     }
#                 jsonized_results.append(dict)

#             return jsonized_results

#         else:
#             return {'error': 'Failed to open the database connection'}, 500
#     except Exception as e:
#         return {'error': f'An error occurred: {str(e)}'}, 500

