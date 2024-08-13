import { PrismaClient } from "@prisma/client"
import { response } from "express";

const prisma = new PrismaClient(); 

export const getBarang = async (req, res) => { 
        try {
        const response = await prisma.barang.findMany({ 
            select:{ 
                id_barang:true,
                nama:true, 
                harga: true, 
                deskripsi: true, 
                kategori: { 
                    select:{ 
                        nama_kategori: true
                    }
                }
            }
        });
            res.status(200).json(response);
        } catch (error) {
            res.status(400).json({msg:error.message});
        }
}

export const getBarangById = async (req, res) => { 
    try {
       const response = await prisma.barang.findUnique({ 
            where:{ 
                id_barang: Number(req.params.id)
            }, 
            select:{ 
                id_barang:true,
                nama:true, 
                harga: true, 
                deskripsi: true, 
                kategori: { 
                    select:{ 
                        nama_kategori: true
                    }
                }
            }
        }); 
        res.status(201).json(response);
    } catch (error) {
        res.status(406).json({msg:error.message});
    }
}

export const createBarang = async (req, res) => { 
    const {nama, harga, deskripsi, kategoriBarang} = req.body; 
    try {
        const barang = await prisma.barang.create({ 
            data:{ 
            nama:nama, 
            harga:harga,
            deskripsi:deskripsi,
            kategoriBarang: Number(kategoriBarang)
        }
     }); 
    res.status(200).json(barang);
    } catch (error) {
        res.status(408).json({msg:error.message});
    }
}

export const updateBarang = async (req, res) => { 
    const {nama, harga, deskripsi, kategoriBarang} = req.body;
    try {
        const barang = await prisma.barang.update({ 
            where:{ 
                id_barang : Number(req.params.id)
            },
            data:{ 
            nama:nama, 
            harga:harga,
            deskripsi:deskripsi,
            kategoriBarang: Number(kategoriBarang)
            }
            
        }); 
    res.status(200).json(barang);
    } catch (error) {
        res.status(408).json({msg:error.message});
    }
}

export const deleteBarang = async (req, res) => { 
    
    try {
        const barang = await prisma.barang.delete({
            where:{
                id_barang: Number(req.params.id)
            }
        }); 
        res.status(208).json(barang); 
    } catch (error) {
        res.status(410).json({msg:error.message});
    }
    
}

