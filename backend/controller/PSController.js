import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient(); 

export const getPS = async (req, res) => { 
    try {
      const response = await prisma.pS.findMany({ 
        select: { 
          id_ps: true, 
          name_ps: true, 
          price: true, 
          status_ps: true,
          room: { 
            select: { 
              id_room: true,
              name_room: true 
            }
          }
        }
      });
      
      const modifiedResponse = response.map(ps => ({
        ...ps,
        status_ps: ps.status_ps ? 'Available' : 'Not Available'
      }));
  
      res.status(200).json(modifiedResponse);
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: error.message });
    }
  };

  export const getPSById = async (req, res) => { 

    try {
      const response = await prisma.pS.findMany({ 
        where:{ 
            id_ps: Number(req.params.id)
        },
        select: { 
          id_ps: true, 
          name_ps: true, 
          price: true, 
          status_ps: true,
          room: { 
            select: { 
              id_room: true,
              name_room: true 
            }
          }
        }
      });
      
      const modifiedResponse = response.map(ps => ({
        ...ps,
        status_ps: ps.status_ps ? 'Available' : 'Not Available'
      }));
  
      res.status(200).json(modifiedResponse);
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: error.message });
    }
  };

export const createPs = async (req, res) => { 
     const {name_ps, id_room, price,  } = req.body;

     try {
        const ps = await prisma.pS.create({ 
            data:{ 
                name_ps:name_ps, 
                id_room: id_room,
                price: price
            }
        });
        res.status(200).json(ps)
     } catch (error) {
        res.status(400).json({msg:error.message})
     } 
}

export const updatePs = async (req, res) => { 
    const {name_ps, id_room, price, status_ps } = req.body;

    try {
       const ps = await prisma.pS.update({ 
        where: { 
            id_ps : Number(req.params.id)
        },
           data:{ 
               name_ps:name_ps, 
               id_room: id_room,
               price: price, 
               status_ps: status_ps
           }
       });
       res.status(200).json(ps)
    } catch (error) {
       res.status(400).json({msg:error.message})
    } 
}