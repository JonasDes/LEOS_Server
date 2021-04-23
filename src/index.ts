import DiveraHandler from './handlers/DiveraHandler'
import SocketHandler from './handlers/SocketHandler'
import DatabaseHandler from './handlers/DatabaseHandler'
import ServerHandler from './handlers/ServerHandler'
import missionDiaryHandler from './handlers/MissionDiaryHandler';
require('dotenv').config()


const serverHandler = new ServerHandler()
const ioServer = new SocketHandler(serverHandler.http)
const diveraHandler = new DiveraHandler()
const databaseHandler = new DatabaseHandler()


export { ioServer, serverHandler, diveraHandler, missionDiaryHandler, databaseHandler }