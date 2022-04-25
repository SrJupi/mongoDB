use optica

db.createCollection('suppliers', {
	validator: {
		$jsonSchema: {
			bsonType : "object",
			required: ["_id", "name", "address", "contact", "fiscal"],
			properties: {
				_id: {
					bsonType: "string"
				},
				name: {
					bsonType: "string"
				},
				address:{
					bsonType: "object",
					required: ["address", "city", "state", "zip_code"],
					properties:{
						address: {
							bsonType: "string",
							description: "full address: street name + number"
						},
						city: {
							bsonType: "string"
						},
						state: {
							bsonType: "string"
						},
						zip_code: {
							bsonType: "string"
						}
					}
				},
				contact: {
					bsonType: "object",
					required: ["phone", "fax"],
					properties:{
						phone: {
							bsonType: "string"
						},	
						fax: {
							bsonType: "string"
						}
					}
				},
				fiscal:{
					bsonType: "string",
					description: "NIF/NIE/... fiscal identification"
				}
			}
		}
	}
})

db.createCollection('brands', {
	validator: {
		$jsonSchema: {
			bsonType : "object",
			required: ["_id", "name", "supplier"],
			properties: {
				_id: {
					bsonType: "string"
				},
				name: {
					bsonType: "string"
				},
				supplier:{
					bsonType: "string",
					description: "Object ID from suppliers collection"
				}
			}
		}
	}
})

db.createCollection('glasses', {
	validator: {
		$jsonSchema: {
			bsonType : "object",
			required: ["_id", "brand", "lenses", "frame", "price"],
			properties: {
				_id: {
					bsonType: "string"
				},
				brand: {
					bsonType: "string",
					description: "Object ID from brand collection"
				},
				lenses:{
					bsonType: "object",
					required: ["left", "right"],
					properties:{
						left: {
							bsonType: "object",
							required: ["graduation", "color"],
							properties: {
								graduation: {
									bsonType: "string"
								},
								color: {
									bsonType: "string"
								}
							}
						},
						right: {
							bsonType: "object",
							required: ["graduation", "color"],
							properties: {
								graduation: {
									bsonType: "string"
								},
								color: {
									bsonType: "string"
								}
							}
						}
					}
				},
				frame: {
					bsonType: "object",
					required: ["material", "color"],
					properties:{
						material: {
							enum: ["Plastic", "Metallic", "Floating"],
							description: "must be: Plastic or Metallic or Floating"
						},	
						color: {
							bsonType: "string"
						}
					}
				},
				price:{
					bsonType: "decimal"
				}
			}
		}
	}
})

db.createCollection('customers', {
	validator: {
		$jsonSchema: {
			bsonType : "object",
			required: ["_id", "name", "address", "contact", "register_date"],
			properties: {
				_id: {
					bsonType: "string"
				},
				name: {
					bsonType: "string"
				},
				address:{
					bsonType: "object",
					required: ["address", "city", "state", "zip_code"],
					properties:{
						address: {
							bsonType: "string",
							description: "full address: street name + number"
						},
						city: {
							bsonType: "string"
						},
						state: {
							bsonType: "string"
						},
						zip_code: {
							bsonType: "string"
						}
					}
				},
				contact: {
					bsonType: "object",
					required: ["phone", "email"],
					properties:{
						phone: {
							bsonType: "string"
						},	
						email: {
							bsonType: "string"
						}
					}
				},
				register_date:{
					bsonType: "string"
				}
			}
		}
	}
})

db.createCollection('sales', {
	validator: {
		$jsonSchema: {
			bsonType : "object",
			required: ["_id", "customer", "employee", "glasses_sold"],
			properties: {
				_id: {
					bsonType: "string",
				},
				customer: {
					bsonType: "string",
					description: "customer id from customer collection"
				},
				employee: {
					bsonType: "string"
				},
				glasses_sold: {
					bsonType: "array",
					description: "glasses array sold",
					items: {
						bsonType: "string",
						description: "glasses id from glasses collection"
					}
				},
			}
		}
	}
})

db.suppliers.insertMany([
	{
		_id: "S001",
		name: "Supplier 1",
		address: {
			address: "Street A, 001",
			city: "City",
			state: "ST",
			zip_code: "12345678"
		},
		contact: {
			phone: "987654321",
			fax: "5555555555"
		},
		fiscal: "NIF1234567"
	},
	{
		_id: "S002",
		name: "Supplier 2",
		address: {
			address: "Street B, 345",
			city: "City",
			state: "ST",
			zip_code: "12345000"
		},
		contact: {
			phone: "987654555",
			fax: "555345345"
		},
		fiscal: "NIF987655"
	}
])

db.customers.insertMany([
	{
		_id: "C001",
		name: "John Doe",
		address: {
			address: "Street C, 999",
			city: "City",
			state: "ST",
			zip_code: "12345666"
		},
		contact: {
			phone: "123123123",
			email: "john@doe.com"
		},
		register_date: Date()
	},
	{
		_id: "C002",
		name: "Jane Doe",
		address: {
			address: "Street D, 123",
			city: "City",
			state: "ST",
			zip_code: "12345432"
		},
		contact: {
			phone: "333333333",
			email: "jane@doe.com"
		},
		register_date: Date()
	},
	{
		_id: "C003",
		name: "Indicated Doe",
		address: {
			address: "Street E, 444",
			city: "City",
			state: "ST",
			zip_code: "12345412"
		},
		contact: {
			phone: "124351681",
			email: "indicated@doe.com"
		},
		register_date: Date(),
		indicated_by: "C001"
	}
])

db.brands.insertMany([
	{
		_id: "B001",
		name: "Brand 1",
		supplier: "S001"
	},
	{
		_id: "B002",
		name: "Brand 2",
		supplier: "S001"
	},
	{
		_id: "B003",
		name: "Brand 3",
		supplier: "S002"
	}
])

db.glasses.insertMany([
	{
		_id: "G001",
		brand: "B001",
		lenses: {
			left: {
				graduation: "",
				color: "transparent"
			},
			right: {
				graduation: "",
				color: "transparent"
			}
		},
		frame: {
			material: "Plastic",
			color: "Black"
		},
		price: NumberDecimal(100.50)
	},
	{
		_id: "G002",
		brand: "B001",
		lenses: {
			left: {
				graduation: "",
				color: "transparent"
			},
			right: {
				graduation: "",
				color: "transparent"
			}
		},
		frame: {
			material: "Plastic",
			color: "Blue"
		},
		price: NumberDecimal(105.50)
	},
	{
		_id: "G003",
		brand: "B001",
		lenses: {
			left: {
				graduation: "",
				color: "transparent"
			},
			right: {
				graduation: "",
				color: "transparent"
			}
		},
		frame: {
			material: "Plastic",
			color: "Red"
		},
		price: NumberDecimal(108.50)
	}
])

db.sales.insertMany([
	{
		customer: "C001",
		employee: "Employee 1",
		glasses_sold: [ "G001"],
	},
	{
		customer: "C001",
		employee: "Employee 1",
		glasses_sold: [ "G001", "G002"],
	},
	{
		customer: "C002",
		employee: "Employee 1",
		glasses_sold: [ "G002", "G003"],
	},
	{
		customer: "C003",
		employee: "Employee 2",
		glasses_sold: [ "G003"],
	},
])
