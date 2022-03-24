use pizzaria

db.createCollection('provinces', {
	validator: {
		$jsonSchema: {
			bsonType : "object",
			required: ["_id", "name"],
			properties: {
				_id: {
					bsonType: "string"
				},
				name: {
					bsonType: "string"
				}
			}
		}
	}
})

db.createCollection('localities', {
	validator: {
		$jsonSchema: {
			bsonType : "object",
			required: ["_id", "name", "province"],
			properties: {
				_id: {
					bsonType: "string"
				},
				name: {
					bsonType: "string"
				},
				province: {
					bsonType: "string",
					description: "id from provinces collection"
				}
			}
		}
	}
})

db.createCollection('customers', {
	validator: {
		$jsonSchema: {
			bsonType : "object",
			required: ["_id", "name", "address", "phone"],
			properties: {
				_id: {
					bsonType: "string"
				},
				name: {
					bsonType: "string"
				},
				address: {
					bsonType: "object",
					required: ["street", "locality","zip_code"],
					properties: {
						street: {
							bsonType: "string"
						},
						locality: {
							bsonType: "string",
							description: "locality id from localities collection"
						},
						zip_code: {
							bsonType: "string"
						}
					}
				},
				phone: {
					bsonType: "string"
				}
			}
		}
	}
})

db.createCollection('orders', {
	validator: {
		$jsonSchema: {
			bsonType : "object",
			required: ["_id", "customer", "store", "order_items", "price", "order_date", "service_type"],
			properties: {
				_id: {
					bsonType: "string"
				},
				customer: {
					bsonType: "string",
					description: "customer id from customers collection"
				},
				store: {
					bsonType: "string",
					description: "store id from stores collection"
				},
				order_items: {
					bsonType: "array",
					items: {
						bsonType: "object",
						required: ["item_id", "quantity"],
						properties: {
							item_id: {
								bsonType: "string",
								description: "item id from items collection"
							},
							quantity: {
								bsonType: "int"
							}
						}
					}
				},
				price: {
					bsonType: "decimal"
				},
				order_date: {
					bsonType: "string"
				},
				service_type: {
					enum: ["Delivery", "Takeout"]
				}
			}
		}
	}
})

db.createCollection('items', {
	validator: {
		$jsonSchema: {
			bsonType : "object",
			required: ["_id", "name", "description", "category", "image", "price"],
			properties: {
				_id: {
					bsonType: "string"
				},
				name: {
					bsonType: "string"
				},
				description: {
					bsonType: "string"
				},
				category: {
					enum: ["Burguer", "Drink", "Pizza"]
				},
				image: {
					bsonType: "string",
					description: "URL for the image"
				},
				price: {
					bsonType: "decimal"
				}
			}
		}
	}
})

db.createCollection('pizza_categories', {
	validator: {
		$jsonSchema: {
			bsonType : "object",
			required: ["_id", "name"],
			properties: {
				_id: {
					bsonType: "string"
				},
				name: {
					bsonType: "string"
				}
			}
		}
	}
})

db.createCollection('stores', {
	validator: {
		$jsonSchema: {
			bsonType : "object",
			required: ["_id", "address", "employees"],
			properties: {
				_id: {
					bsonType: "string"
				},				
				address: {
					bsonType: "object",
					required: ["street", "locality","zip_code"],
					properties: {
						street: {
							bsonType: "string"
						},
						locality: {
							bsonType: "string",
							description: "locality id from localities collection"
						},
						zip_code: {
							bsonType: "string"
						}
					}
				},
				employees: {
					bsonType: "array",
					items: {
						bsonType: "string",
						description: "employee id from employees collection"
					}
				}
			}
		}
	}
})

db.createCollection('employees', {
	validator: {
		$jsonSchema: {
			bsonType : "object",
			required: ["_id", "name", "phone", "fiscal", "job"],
			properties: {
				_id: {
					bsonType: "string"
				},
				name: {
					bsonType: "string"
				},
				phone: {
					bsonType: "string"
				},
				fiscal: {
					bsonType: "string"
				},
				job: {
					enum: ["Cooker", "Delivery"]
				}
			}
		}
	}
})

db.provinces.insertMany([
	{
		_id: "1",
		name: "Araba/Álava"
	},
	{
		_id: "2",
		name: "Albacete"
	},
	{
		_id: "3",
		name: "Alicante/Alacant"
	}
])

db.localities.insertMany([
	{
		_id: "1",
		name: "Alicante/Alacant",
		province: "3"
	},
	{
		_id: "2",
		name: "Adsubia",
		province: "3"
	},
	{
		_id: "3",
		name: "Agost",
		province: "2"
	}
])

db.customers.insertMany([
	{
		_id: "1",
		name: "John Doe",
		address: {
			street: "Street 1, 123",
			locality: "1",
			zip_code: "03001"
		},
		phone: "12345678"
	},
	{
		_id: "2",
		name: "Jane Doe",
		address: {
			street: "Street 3, 321",
			locality: "1",
			zip_code: "03002"
		},
		phone: "87654321"
	},
	{
		_id: "3",
		name: "Random Doe",
		address: {
			street: "Street 3, 333",
			locality: "1",
			zip_code: "03003"
		},
		phone: "555333555"
	}
])

db.employees.insertMany([
	{
		_id: "1",
		name: "Employee 1",
		phone: "12345678",
		fiscal: "Y128371A",
		job: "Cooker"
	},
	{
		_id: "2",
		name: "Employee 2",
		phone: "33335555",
		fiscal: "A182371A",
		job: "Cooker"
	},
	{
		_id: "3",
		name: "Employee 3",
		phone: "98765432",
		fiscal: "918891A",
		job: "Delivery"
	}
])

db.stores.insertMany([
	{
		_id: "1",
		address: {
			street: "Store1, 000",
			locality: "1",
			zip_code: "03001"
		},
		employees: ["1", "3"]
	},
	{
		_id: "2",
		address: {
			street: "Store2, 003",
			locality: "1",
			zip_code: "03001"
		},
		employees: ["3"]
	}
])

db.pizza_categories.insertMany([
	{
		_id: "1",
		name: "Classic"
	},
	{
		_id: "2",
		name: "Special"
	}
])

db.items.insertMany([
	{
		_id: "B01",
		name: "Classic Burguer",
		description: "Simple Burguer",
		category: "Burguer",
		image: "http://imageOfBurguer1...",
		price: NumberDecimal("3.5")
	},
	{
		_id: "B02",
		name: "Special Burguer",
		description: "Special Burguer",
		category: "Burguer",
		image: "http://imageOfBurguer2...",
		price: NumberDecimal("4.5")
	},
	{
		_id: "D01",
		name: "Water",
		description: "Water",
		category: "Drink",
		image: "http://imageOfWater...",
		price: NumberDecimal("1.5")
	},
	{
		_id: "D02",
		name: "Coke",
		description: "Coke",
		category: "Drink",
		image: "http://imageOfCoke...",
		price: NumberDecimal("2")
	},
	{
		_id: "P01",
		name: "Pizza 1",
		description: "Pizza 1",
		category: "Pizza",
		image: "http://imageOfPizza1...",
		price: NumberDecimal("4"),
		pizza_category: "1"
	},
	{
		_id: "P02",
		name: "Pizza 2",
		description: "Pizza 2",
		category: "Pizza",
		image: "http://imageOfPizza2...",
		price: NumberDecimal("4.9"),
		pizza_category: "2"
	}
])

db.orders.insertMany([
	{
		_id: "1",
		customer: "1",
		store: "1",
		order_items: [
		{
			item_id: "P01",
			quantity: NumberInt(2),
		},
		{
			item_id: "D01",
			quantity: NumberInt(2),
		}
		],
		price: NumberDecimal("10.5"),
		order_date: Date(),
		service_type: "Delivery",
		delivery_employee: "3",
		delivery_date: Date()
	},
	{
		_id: "2",
		customer: "2",
		store: "1",
		order_items: [
		{
			item_id: "P02",
			quantity: NumberInt(2),
		},
		{
			item_id: "D02",
			quantity: NumberInt(2),
		}
		],
		price: NumberDecimal("12.5"),
		order_date: Date(),
		service_type: "Takeout"
	},
	{
		_id: "3",
		customer: "1",
		store: "1",
		order_items: [
		{
			item_id: "P01",
			quantity: NumberInt(2),
		},
		{
			item_id: "D01",
			quantity: NumberInt(2),
		},
		{
			item_id: "B01",
			quantity: NumberInt(1)
		},
		{
			item_id: "D02",
			quantity: NumberInt(1)
		}
		],
		price: NumberDecimal("20.5"),
		order_date: Date(),
		service_type: "Takeout",
	}
])
