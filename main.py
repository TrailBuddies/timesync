import discord

class TimeSync(discord.Client):
  async def on_ready(self):
        print('Logged on as', self.user)


client = TimeSync()
client.run(token)