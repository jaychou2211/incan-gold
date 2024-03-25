import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE', // todo : avoid magic strings(另外抽至 constants.ts)
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mssql',
        host: 'incangold.database.windows.net',
        port: 1433,
        username: 'pizza0226',
        password: 'Bjns2tZS4P',
        database: 'incangold',
        entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
        ],
        // synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];