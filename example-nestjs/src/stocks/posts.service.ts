import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FileService } from 'src/file.service';
import { Posts } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor (private fileService: FileService<Posts[]>) {}

  create(createStockDto: CreatePostDto) {
    const stocks = this.fileService.read();

    const stock = {...createStockDto, id: stocks.length + 1};
    this.fileService.add(stock) 
  }

  findAll(title?: string, tags ?:string[] | string): Posts[] {
    const stocks = this.fileService.read();
    if (typeof tags === 'string') {
      tags = [tags];
    }
    return stocks.filter((stock) =>{
        const matchTitle = title ?
          stock.title.toLowerCase().includes(title.toLowerCase())
          : true;
          const matchTags = tags?.length ?
          tags.some(tag =>
            stock.tags.some(stockTag =>
              stockTag.toLowerCase() === tag.toLowerCase()
            )
          ) 
          : true;
        return matchTags && matchTitle
        }
    );
  }

  findOne(id: number):Posts | null {
    const stocks = this.fileService.read();

    return stocks.find((stock) => stock.id == id) ?? null;
  }

  update(id: number, updateStockDto: UpdatePostDto): void {
    const stocks = this.fileService.read();
    const updatedStocks = stocks.map((stock) =>
      stock.id == id ? {...stock, ...updateStockDto} : stock,
  );
  this.fileService.write(updatedStocks)
  }

  remove(id: number): void{
    const filteredStocks = this.fileService
    .read()
    .filter((stock) => stock.id != id);
    this.fileService.write(filteredStocks);
  }
}
