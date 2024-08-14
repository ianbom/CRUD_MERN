import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient(); 

export const getUserTransactions = async (req, res) => { 
    try {
        const response = await prisma.transaction.findMany({ 
            where: { 
                id_user : req.user.userId
            },
            select: { 
                id_transaction: true, 
                start_hour: true, 
                end_hour: true, 
                total_price: true, 
                status_payment: true, 
                created_at: true, 
                updated_at: true, 
                user: { 
                    select: { 
                        id: true, 
                        name: true
                    }
                },
                ps: { 
                    select: { 
                        name_ps: true, 
                        price: true, 
                        room: { 
                            select: {
                                name_room: true
                            }
                        }
                    }
                }
            }
        }); 
        console.log("Sukses tampil : ", response)
        res.status(200).json(response);
    } catch (error) {

        res.status(400).json({msg: error.message});
    }
}



export const createTransaction = async (req, res) => { 
    const { id_user, id_ps, start_hour, end_hour } = req.body; 
    try {
        const ps = await prisma.pS.findUnique({
            where: { id_ps: id_ps },
            select: { price: true }
        });

        if (!ps) {
            return res.status(404).json({ error: 'PS not found' });
        }

        // Hitung durasi dalam jam
        const startTime = new Date(start_hour);
        const endTime = new Date(end_hour);
        const duration = (endTime - startTime) / (1000 * 60 * 60); // Konversi milidetik ke jam

        // Hitung total harga
        const total_price = ps.price * duration;

        // Buat transaksi baru
        const transaction = await prisma.transaction.create({ 
            data: { 
                id_user: id_user, 
                id_ps: id_ps, 
                start_hour: start_hour, 
                end_hour: end_hour,
                total_price: total_price
            }
        });

        res.status(201).json(transaction);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error.message });
    }
};

export const getTransactionById = async (req, res) => { 
    const { id } = Number(req.params.id);
    try {
        const response = await prisma.transaction.findMany({ 
            where:{ 
                id_transaction : id
            },
            select:{ 
                id_transaction: true, 
                start_hour: true, 
                end_hour: true, 
                total_price: true, 
                status_payment: true, 
                created_at: true, 
                updated_at: true, 
                user: { 
                    select:{ 
                        id: true, 
                        name: true
                    }
                },
                ps: { 
                    select:{ 
                        name_ps: true, 
                        price: true, 
                        room : { 
                            select: {
                                name_room: true
                            }
                        }
                    }
                }
            }
        }); 
        console.log("sukses input transaksi")
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({msg: error.message})
    }

}