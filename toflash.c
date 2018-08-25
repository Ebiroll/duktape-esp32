#include <stdio.h>
#include <stdlib.h>
//
// qemu_toflash
// 
// python /home/olas/esp/esp-idf/components/esptool_py/esptool/esptool.py --chip esp32 --port /dev/ttyUSB0 --baud 115200 --before default_reset --after hard_reset write_flash -z --flash_mode dio --flash_freq 40m --flash_size detect 
// 0x1000  /home/olas/esp/esp-idf/examples/system/ota/build/bootloader/bootloader.bin  
// 0x10000 /home/olas/esp/esp-idf/examples/system/ota/build/ota.bin 
// 0x8000 /home/olas/esp/esp-idf/examples/system/ota/build/partitions_two_ota.bin
//

void merge_flash(char *binfile,char *flashfile,int flash_pos,int patch_hash)
{
    FILE *fbin;
    FILE *fflash;
    unsigned char *tmp_data;
    unsigned char *flash_data;

    int file_size=0;
    int flash_size=0;

    fbin = fopen(binfile, "r");
    if (fbin == NULL) {
        printf("   Can't open '%s' for reading.\n", binfile);
		return;
	}

    if (fseek(fbin, 0 , SEEK_END) != 0) {
       /* Handle Error */
    }
    file_size = ftell(fbin);

    if (fseek(fbin, 0 , SEEK_SET) != 0) {
      /* Handle Error */
    }

    fflash  = fopen(flashfile, "r+");
    if (fflash == NULL) {
        printf("   Can't open '%s' for writing.\n", flashfile);
        return;
    }
    if (fseek(fflash, 0 , SEEK_END) != 0) {
       /* Handle Error */
    }
    flash_size = ftell(fflash);
    rewind(fflash);
    fseek(fflash,flash_pos,SEEK_SET);

    //flash_data=malloc((1+flash_size)*sizeof(char));    
    //int len_read=fread(tmp_data,sizeof(char),file_size,fbin);

    tmp_data=malloc((1+file_size)*sizeof(char));
    //size_t fread(void *ptr, size_t size, size_t nmemb, FILE *stream);
    //size_t fwrite(const void *ptr, size_t size, size_t nmemb,
    //                 FILE *stream);

    if (file_size<=0) {
      printf("Not able to get file size %s",binfile);
    }

    int len_read=fread(tmp_data,sizeof(char),file_size,fbin);

    if (patch_hash==1) {
      int j=0;
      for (j=0;j<33;j++)
	{
          tmp_data[file_size-j]=0;
	}
    }
    
    int len_write=fwrite(tmp_data,sizeof(char),file_size,fflash);

    if (len_read!=len_write) {
      printf("Not able to merge %s",binfile);
    }

    fclose(fbin);

    if (fseek(fflash, 0 , SEEK_END) != 0) {
    }

    fclose(fflash);

    free(tmp_data);
}


int main(int argc,char *argv[])
{
  //system("cp esp32flash.bin esp32flash.bak");
    // Overwrites esp32flash.bin file, you only need to do this once
    system("dd if=/dev/zero bs=1M count=4  | tr \"\\000\" \"\\377\" >  esp32flash.bin");

    // Add bootloader
    merge_flash("build/bootloader/bootloader.bin","esp32flash.bin",0x1000,0);
    // Add partitions, partitions example here
    merge_flash("build/partitions.bin","esp32flash.bin",0x8000,0);
    // Add flash image
    merge_flash("spiffs.bin","esp32flash.bin",0x180000,0);
    // Add application build/webspiff.bin
    merge_flash(argv[1],"esp32flash.bin",0x10000,0);

    system("cp esp32flash.bin ~/qemu_esp32");

}

