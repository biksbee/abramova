import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const PORT = Number(process.env.PORT) || 30111;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Abramova')
    .setDescription('Abramova documentation')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'Bearer',
    })
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, documentFactory);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  await app.listen(PORT, async () => {
    console.log(`Swagger docs: http://localhost:${PORT}/api/docs`);
    console.log(`Listen port ${PORT}`);
  });
}
bootstrap();
