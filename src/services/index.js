import axios from 'axios';

const baseURL = 'http://laravel-service.azurewebsites.net/api/';

const http = (headers) => {
	return axios.create({ baseURL, headers });
};

class Service {
	// LOGIN SERVICES
	loginAccount(body) {
		// Logear
		const headers = {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		};
		const https = http(headers);
    return https.post('login', JSON.stringify(body));
	}

	// FAMILY SERVICES
	getChildren(token, userId) {
		// Obtener los niños y su data
		const headers = {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		};
		const https = http(headers);
    return https.get(`users/${userId}/family`);
	}

	getExpensesChild(childId, token) {
		// Obtener los gastos de los niños
		const headers = {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		};
		const https = http(headers);

		return https.get(`children/${childId}/expenses`);
	}

	getDetailsChild(childId, token) {
		// Obtener los movimientos de los niños
		const headers = {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		};
		const https = http(headers);

		return https.get(`children/${childId}/vista/movements`);
	}

	// TRANSFER SERVICES
	getTransferList(token, userId) {
		// Obtener lista de transferencias (Family contacts and others)
		const headers = {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		};
		const https = http(headers);

		return https.get(`users/${userId}/transfer/list`);
	}

	makeTransfer(token, senderId, ammount, contactId, isFamily) {
		// Realizar transferencia
		const headers = {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		};
		const https = http(headers);

		if (isFamily) {
			return https.post('users/transfer', JSON.stringify(
				{
					senderId, ammount, receiptId: contactId
				}
			));
		}
		return https.post('users/transfer', JSON.stringify(
			{
				senderId, ammount, contactId
			}
		));
	}


	addContact(userId, name, number, token, typeId = 2, rut = '192098327', bank = 'Banco Santander') {
		// Agregar un contacto a la agenda para transferir
		const headers = {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		};
		const https = http(headers);

		return https.post('users/add/contact', JSON.stringify(
			{
				userId, typeId, number, rut, bank, name
			}
		));
	}

	// CONTRIBUTION SERVICES
	makeContribution(token, childId, ammount, userId) {
		// Realizar un aporte
		const headers = {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		};
		const https = http(headers);

		return https.post(`children/${childId}/contribution`, JSON.stringify(
			{
				userId, ammount
			}
		));
	}

	getSavingAccounts(token, userId) {
		// Obtener las cuentas donde se puede aportar
		const headers = {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		};
		const https = http(headers);

		return https.get(`users/${userId}/children/investment`);
	}

}

export const services = new Service();
