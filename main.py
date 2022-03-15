import discord
from decouple import config


client = discord.Client()


@client.event
async def on_ready():
    print('We have logged in as {0} '.format(client.user))


client.run(config('TOKEN'))
