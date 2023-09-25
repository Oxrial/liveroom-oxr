import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
export const initDoc = app => {
    const options = new DocumentBuilder().setTitle('APIS').setDescription('LIVEROOM APIS').setVersion('1').build()
    const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup('/docs', app, document)
}
