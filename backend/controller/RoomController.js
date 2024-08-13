import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createRoom = async (req, res) => {  
    const {name_room} = req.body; 
    try {
        const room = await prisma.room.create({data: {name_room}});
    res.status(200).json(room);
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
    
}


export const getRoom = async (req, res) => { 
    try {
        const response = await prisma.room.findMany();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}

export const getRoomById = async (req, res) => { 
    try {
        const response = await prisma.room.findUnique({ 
            where:{ 
                id_room: Number(req.params.id) 
            },
        }); 
        res.status(202).json(response);
    } catch (error) {
        res.status(404).json({msg:error.message})
    }
}