
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Form as FormUI,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

const dailyActivityOptions = [
  "Apel Pagi dan Apel Sore",
  "Giat Maghrib",
  "Ground Check Hotspot",
  "In House Training",
  "Koordinasi",
  "Melengkapi Administrasi Patroli",
  "Menggrid Foto Kegiatan",
  "Monitoring Areal Bekas Kebakaran Lainnya",
  "Pemadaman Dini",
  "Sosialisasi Pencegahan Karhutla",
  "Lainnya"
];

const inventoryPatroli = [
  "GPS", "Mesin Max", "Mobil Triton", "Motor KLX", "Motor Viar", "Nozzle", "Pompa punggung", "Selang", "Lainnya"
];

const satelit = [
  "NOAA", "NPP", "Terra/aqua", "BRIN"
];

// Define combined form schema with zod
const formSchema = z.object({
  // Contact form fields
  categoryPatroli: z.string({
    required_error: "Please select a category patroli",
  }),
  dailyActivity: z.array(z.string()).optional(),
  anggotaPatroli: z.string().optional(),
  inventoryPatroli: z.array(z.string()),
  satelit: z.array(z.string()),
  latitude: z.number({
    required_error: "Mohon masukkan nilai latitude",
  }),
  longitude: z.number({
    required_error: "Mohon masukkan nilai longitude",
  }),
  desa: z.string(),
  kecamatan: z.string(),
  kabupaten: z.string(),
  provinsi: z.string(),
  cuaca_pagi: z.string(),
  cuaca_siang: z.string(),
  cuaca_sore: z.string(),
  curah_hujan: z.number(),
  suhu: z.number(),
  kelembaban: z.number(),
  kecepatan_angin: z.number(),
  kondisi_lapangan: z.string(),
  potensi_karhutla: z.string(),
  aktivitas_masyarakat: z.string(),
  aksesibilitas: z.array(z.string()),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const FormPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryPatroli: "",
      dailyActivity: [""],
      anggotaPatroli: "",
      inventoryPatroli: [""],
      satelit: [""],
      latitude: 0,
      longitude: 0,
      desa: "",
      kecamatan: "",
      kabupaten: "",
      provinsi: "",
      cuaca_pagi: "",
      cuaca_siang: "",
      cuaca_sore: "",
      curah_hujan: 0,
      suhu: 0,
      kelembaban: 0,
      kecepatan_angin: 0,
      kondisi_lapangan: "",
      potensi_karhutla:"",
      aktivitas_masyarakat: "",
      aksesibilitas: [""],
      termsAccepted: false,
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call with a delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Form submitted with values:", values);
    
    setIsSubmitting(false);
    
    // Show success toast notification
    toast({
      title: "Form Submitted",
      description: "Your form has been successfully submitted",
    });
    
    form.reset();
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Form Laporan Patroli</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <FormUI {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Main Contact Form Section */}
              <div className="space-y-6">
                <h2 className="text-lg font-medium">Data Umum</h2>
                
                <FormField
                  control={form.control}
                  name="categoryPatroli"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kategori Patroli</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Kategori" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mandiri">Mandiri</SelectItem>
                            <SelectItem value="rutin">Rutin</SelectItem>
                            <SelectItem value="terpadu">Terpadu</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dailyActivity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Aktivitas Harian</FormLabel>
                      <div className="space-y-2">
                        {dailyActivityOptions.map((item) => (
                          <FormField
                            key={item}
                            control={form.control}
                            name="dailyActivity"
                            render={({ field }) => {
                              const isChecked = field.value?.includes(item);

                              const toggleValue = () => {
                                const newValue = isChecked
                                  ? field.value.filter((v: string) => v !== item)
                                  : [...(field.value || []), item];
                                field.onChange(newValue);
                              };

                              return (
                                <FormItem
                                  key={item}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={isChecked}
                                      onCheckedChange={toggleValue}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal capitalize">
                                    {item}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="anggotaPatroli"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Anggota Patroli</FormLabel>
                      <FormControl>
                        <Input placeholder="List Anggota Patroli" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="inventoryPatroli"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Inventory Patroli</FormLabel>
                      <div className="space-y-2">
                        {inventoryPatroli.map((item) => (
                          <FormField
                            key={item}
                            control={form.control}
                            name="inventoryPatroli"
                            render={({ field }) => {
                              const isChecked = field.value?.includes(item);

                              const toggleValue = () => {
                                const newValue = isChecked
                                  ? field.value.filter((v: string) => v !== item)
                                  : [...(field.value || []), item];
                                field.onChange(newValue);
                              };

                              return (
                                <FormItem
                                  key={item}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={isChecked}
                                      onCheckedChange={toggleValue}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal capitalize">
                                    {item}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="satelit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Satelit</FormLabel>
                      <div className="space-y-2">
                        {satelit.map((item) => (
                          <FormField
                            key={item}
                            control={form.control}
                            name="satelit"
                            render={({ field }) => {
                              const isChecked = field.value?.includes(item);

                              const toggleValue = () => {
                                const newValue = isChecked
                                  ? field.value.filter((v: string) => v !== item)
                                  : [...(field.value || []), item];
                                field.onChange(newValue);
                              };

                              return (
                                <FormItem
                                  key={item}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={isChecked}
                                      onCheckedChange={toggleValue}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal capitalize">
                                    {item}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator className="my-6" />
              
              {/* Sub-Form Section */}
              <div className="space-y-6">
                <h2 className="text-lg font-medium">Data Patroli Darat</h2>
                <FormField
                  control={form.control}
                  name="latitude"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Latitude</FormLabel>
                      <FormControl>
                        <Input placeholder="Latitude of map" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="longitude"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Longitude</FormLabel>
                      <FormControl>
                        <Input placeholder="Longitude of map" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                  control={form.control}
                  name="desa"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Desa/Kelurahan</FormLabel>
                      <FormControl>
                        <Input placeholder="Desa / Kelurahan" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="kecamatan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kecamatan</FormLabel>
                      <FormControl>
                        <Input placeholder="Kecamatan" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="kabupaten"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kabupaten</FormLabel>
                      <FormControl>
                        <Input placeholder="Kabupaten" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="provinsi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Provinsi</FormLabel>
                      <FormControl>
                        <Input placeholder="Provinsi" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cuaca_pagi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cuaca Pagi</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Cuaca" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cerah">Cerah</SelectItem>
                            <SelectItem value="cerah_berawan">Cerah Berawan</SelectItem>
                            <SelectItem value="berawan">Berawan</SelectItem>
                            <SelectItem value="berawan_tebal">Berawan Tebal</SelectItem>
                            <SelectItem value="udara_kabur">Udara Kabur</SelectItem>
                            <SelectItem value="hujan_lokal">Hujan Lokal</SelectItem>
                            <SelectItem value="hujan_ringan">Hujan Ringan</SelectItem>
                            <SelectItem value="hujan_sedang">Hujan Sedang</SelectItem>
                            <SelectItem value="hujan_petir">Hujan Petir</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cuaca_siang"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cuaca Siang</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Cuaca" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cerah">Cerah</SelectItem>
                            <SelectItem value="cerah_berawan">Cerah Berawan</SelectItem>
                            <SelectItem value="berawan">Berawan</SelectItem>
                            <SelectItem value="berawan_tebal">Berawan Tebal</SelectItem>
                            <SelectItem value="udara_kabur">Udara Kabur</SelectItem>
                            <SelectItem value="hujan_lokal">Hujan Lokal</SelectItem>
                            <SelectItem value="hujan_ringan">Hujan Ringan</SelectItem>
                            <SelectItem value="hujan_sedang">Hujan Sedang</SelectItem>
                            <SelectItem value="hujan_petir">Hujan Petir</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cuaca_sore"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cuaca Sore</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Cuaca" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cerah">Cerah</SelectItem>
                            <SelectItem value="cerah_berawan">Cerah Berawan</SelectItem>
                            <SelectItem value="berawan">Berawan</SelectItem>
                            <SelectItem value="berawan_tebal">Berawan Tebal</SelectItem>
                            <SelectItem value="udara_kabur">Udara Kabur</SelectItem>
                            <SelectItem value="hujan_lokal">Hujan Lokal</SelectItem>
                            <SelectItem value="hujan_ringan">Hujan Ringan</SelectItem>
                            <SelectItem value="hujan_sedang">Hujan Sedang</SelectItem>
                            <SelectItem value="hujan_petir">Hujan Petir</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="curah_hujan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Curah Hujan</FormLabel>
                      <FormControl>
                        <Input placeholder="Curah Hujan (mm)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="suhu"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Suhu</FormLabel>
                      <FormControl>
                        <Input placeholder="Suhu (15-70 C)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="kelembaban"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kelembaban</FormLabel>
                      <FormControl>
                        <Input placeholder="Kelembaban (0% - 100% RH)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="kecepatan_angin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kecepatan Angin</FormLabel>
                      <FormControl>
                        <Input placeholder="Kecepatan Angin (km/jam)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="kondisi_lapangan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kondisi Lapangan</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Kondisi Lapangan" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ada_karhutla">Ada Karhutla</SelectItem>
                            <SelectItem value="bekas_karhutla">Bekas Karhutla</SelectItem>
                            <SelectItem value="rawan_karhutla">Rawan Karhutla</SelectItem>
                            <SelectItem value="tidak_ada_karhutla">Tidak Ada Karhutla</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="potensi_karhutla"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Potensi Karhutla</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Potensi Karhutla" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="rendah">Rendah</SelectItem>
                            <SelectItem value="sedang">Sedang</SelectItem>
                            <SelectItem value="tinggi">Tinggi</SelectItem>
                            <SelectItem value="ekstrim">Ekstrim</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="aktivitas_masyarakat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Aktivitas Masyarakat</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Aktivitas Masyarakat" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="true">Ada</SelectItem>
                            <SelectItem value="false">Tidak</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="aksesibilitas"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Aksesibilitas</FormLabel>
                      <div className="space-y-2">
                        {["air","jalan kaki","roda 2","roda 4", "tidak ada"].map((item) => (
                          <FormField
                            key={item}
                            control={form.control}
                            name="aksesibilitas"
                            render={({ field }) => {
                              const isChecked = field.value?.includes(item);

                              const toggleValue = () => {
                                const newValue = isChecked
                                  ? field.value.filter((v: string) => v !== item)
                                  : [...(field.value || []), item];
                                field.onChange(newValue);
                              };

                              return (
                                <FormItem
                                  key={item}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={isChecked}
                                      onCheckedChange={toggleValue}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal capitalize">
                                    {item}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <Separator className="my-6" />
              
              <FormField
                control={form.control}
                name="termsAccepted"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Sudah Yakin dengan data Anda?
                      </FormLabel>                     
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </FormUI>
        </div>
      </div>
    </Layout>
  );
};

export default FormPage;
