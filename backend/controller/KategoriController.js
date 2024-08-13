import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient(); 

export const getKategori = async (req, res) => { 
    try {
        const response = await prisma.kategori.findMany(); 
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg:error.message});
    }
}

export const getKategoriById = async (req, res) => { 
    try {
        const response = await prisma.kategori.findUnique({ 
            where:{ 
                id_kategori: Number(req.params.id) 
            }
        }); 
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({msg:error.message});
    }
}

export const createKategori = async (req, res) => { 
    const {nama_kategori} = req.body;  
    try {
        const kategori = await prisma.kategori.create({ 
            data: { 
                nama_kategori:nama_kategori, 
            }
        });
        res.status(201).json(kategori); 
    } catch (error) {
            res.status(400).json({msg:error.message});
    }
}

export const updateKategori = async (req, res) => { 
    const {nama_kategori} = req.body;  
    try {
        const kategori = await prisma.kategori.update({  
            where: { 
                id_kategori:Number(req.params.id)
            },
            data: { 
                nama_kategori:nama_kategori, 
            }
        });
        res.status(202).json(kategori); 
    } catch (error) {
            res.status(405).json({msg:error.message});
    }
}

export const deleteKategori = async (req, res) => { 
    try {
        const kategori = await prisma.kategori.delete({ 
            where:{ 
                id_kategori: Number(req.params.id) 
            }
        }); 
        res.status(203).json(kategori);
    } catch (error) {
        res.status(500).json({msg:error.message});
    }
}