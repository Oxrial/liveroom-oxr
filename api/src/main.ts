import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { initDoc } from './docs'
import { VersioningType } from '@nestjs/common'
import { CommExceptionFilter } from './common/filter/exception.filter'
import { AssembleInterceptor } from './common/interceptor/assemble.interceptor'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.enableVersioning({ defaultVersion: '1', type: VersioningType.URI })
    app.setGlobalPrefix('/api')
    initDoc(app)
    app.useGlobalFilters(new CommExceptionFilter())
    app.useGlobalInterceptors(new AssembleInterceptor())
    await app.listen(3001)
}
bootstrap()
