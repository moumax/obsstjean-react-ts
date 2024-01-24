import MembersManager from "../models/MembersManager.js";

const MembersController = {
  async getAllMembers(req, res) {
    try {
      const members = await MembersManager.getAll();
      res.status(200).json(members);
    } catch (error) {
      console.error("Erreur lors de la récupération des members", error);
      res
        .status(500)
        .send("Erreur server lors de la récupération des members");
    }
  },

  async createMember(req, res) {
    const newMember= {
      member: req.body.member,
      email: req.body.email,
    };

    try {
      const createdMember= await MembersManager.create({
        ...newMember
      });

      res.status(201).json(createdMember);
    } catch (error) {
      console.error("Erreur lors de la création du membre", error);
      res
        .status(500)
        .send("Erreur serveur lors de la création du membre");
    }
  },

  async editMember(req, res) {
    const memberToUpdate= {
      member: req.body.member,
      email: req.body.email,
    };

    try {
      const updatedMember= await MembersManager.update(
        memberToUpdate,
        req.params.id,
      );
      res.status(200).json(updatedMember);
    } catch (error) {
      console.error("Erreur lors de la modification du membre", error);
      res
        .status(500)
        .send("Erreur server lors de la modification du membre");
    }
  },

  async deleteMember(req, res) {
    try {
      const member = await MembersManager.delete(req.params.id);
      res.status(204).json(member);
    } catch (error) {
      console.error("Erreur lors de la suppression du membre", error);
      res.status(500).send("Le membre n'a pas été supprimé");
    }
  },
};

export default MembersController;
