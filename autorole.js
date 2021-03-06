const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
    async onReactionAdd (reaction, user) {
        console.log(reaction.emoji.name);
        if (reaction.partial) {
            try {
                await reaction.fetch();
            } catch (error) {
                console.error('Something went wrong when fetching the message: ', error);
                return;
            }
        }

        const autoRole = JSON.parse(fs.readFileSync("auto-role.json"));
        if(autoRole[reaction.message.id]){
            autoRole[reaction.message.id].forEach(async element => {
                if(element["reaction"] == reaction.emoji.name){
                    const role = await reaction.message.guild.roles.fetch(element["role"]);
                    const member = await reaction.message.guild.members.fetch(user.id);
                    await member.roles.add(role)
                    .catch((error) => {
                        console.log(error);
                    });
                }
            });
        }
    },
    async onReactionRemove(reaction, user){
        if (reaction.partial) {
            try {
                await reaction.fetch();
            } catch (error) {
                console.error('Something went wrong when fetching the message: ', error);
                return;
            }
        }

        const autoRole = JSON.parse(fs.readFileSync("auto-role.json"));
        if(autoRole[reaction.message.id]){
            autoRole[reaction.message.id].forEach(async element => {
                if(element["reaction"] == reaction.emoji.name){
                    const role = await reaction.message.guild.roles.fetch(element["role"]);
                    const member = await reaction.message.guild.members.fetch(user.id);
                    await member.roles.remove(role)
                    .catch((error) => {
                        console.log(error);
                    });
                }
            });
        }
    }
}