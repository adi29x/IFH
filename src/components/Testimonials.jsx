import React from 'react';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    text: "Intensiv Filter Himenviro did an excellent job in the design, engineering, manufacture, transport & supply of Electrostatic Precipitator for our 20 MW Power Plant. The performance of ESP is up to our satisfaction since commissioning in 2009.",
    author: "Vice President",
    company: "Empee Power Company (India) Ltd. Group",
    logo: "https://www.intensiv-filter-himenviro.com/wp-content/uploads/2023/06/empee-logo.png"
  },
  {
    text: "Supplied two Process Bag Filters for Coal Grinding of PCI Mill. Both Bag Filters are running satisfactorily. Purging Systems are very efficient and emission level is within designed limits.",
    author: "Associate Vice President – BF",
    company: "Jindal Steel & Power",
    logo: "https://www.intensiv-filter-himenviro.com/wp-content/uploads/2023/06/jindal-logo.png"
  },
  {
    text: "We are satisfied with the performance of the Kiln-1 hybrid ESP running since April 2008. The ESP is meeting the guaranteed level of below 25 mg/Nm3. Thankful for the engineering support.",
    author: "General Manager (E&S)",
    company: "JK Lakshmi Cement Limited",
    logo: "https://www.intensiv-filter-himenviro.com/wp-content/uploads/2023/06/jkl-logo.png"
  }
];

const Testimonials = () => {
  return (
    <section className="section-padding bg-gray-50 overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center mb-24">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-10 h-[1px] bg-industrial-blue"></span>
            <span className="text-industrial-blue font-bold uppercase tracking-[0.2em] text-[10px]">Client Trust</span>
            <span className="w-10 h-[1px] bg-industrial-blue"></span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 tracking-tighter uppercase text-industrial-charcoal leading-tight">
            We Trust <span className="text-industrial-blue">Intensiv Filter Himenviro</span>
          </h2>
          <p className="text-gray-500 font-medium text-lg max-w-2xl">
            Our Testimonial
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {[
            {
              text: "Intensiv Filter Himenviro did an excellent job in the design, engineering, manufacture, transport & supply of Electrostatic Precipitator for our 20 MW Power Plant and for the erection & commissioning of ESP. The performance of ESP is up to our satisfaction since commissioning in 2009 and achieving outlet emission well within the stipulated value.",
              author: "Vice President",
              company: "Empee Power Company (India) Ltd. Group"
            },
            {
              text: "Intensiv Filter Himenviro has supplied two Process Bag Filters for Coal Grinding of PCI Mill of Blast Furnace during the Financial year of 2016 – 2017. Both the Bag Filters are running satisfactorily and total productions of Coal Grinding of PCI Mill are being collected through Bag Filters. Purging Systems of Bag Filter are very efficient.",
              author: "Associate Vice President – BF",
              company: "Jindal Steel & Power"
            },
            {
              text: "We are satisfied with the performance of the Kiln-1 hybrid ESP supplied by Intensiv Filter Himenviro and running since April 2008. The ESP is meeting the guaranteed level of below 25 mg/Nm3. Further, we are thankful to you for the engineering support given for the casing extension of the existing two fields of ESP.",
              author: "General Manager (E&S)",
              company: "JK Lakshmi Cement Limited"
            }
          ].map((t, i) => (
            <div key={i} className="bg-white p-12 rounded-[40px] shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-2xl hover:border-industrial-blue/20 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-industrial-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-industrial-blue/10 transition-colors"></div>
              
              <div className="relative z-10">
                <div className="flex gap-1 mb-8">
                  {[...Array(5)].map((_, index) => (
                    <Star key={index} size={14} fill="#0056A4" className="text-industrial-blue" />
                  ))}
                </div>
                <p className="text-industrial-charcoal font-medium text-sm mb-10 leading-relaxed tracking-tight">"{t.text}"</p>
              </div>
              
              <div className="flex items-center gap-5 border-t border-gray-100 pt-8 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-industrial-blue/10 flex items-center justify-center p-3 border border-industrial-blue/5 group-hover:bg-industrial-blue group-hover:text-white transition-all">
                  <span className="font-black text-xl text-industrial-blue group-hover:text-white uppercase tracking-tighter">
                    {t.company.split(' ')[0][0]}{t.company.split(' ')[1] ? t.company.split(' ')[1][0] : ''}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-industrial-charcoal tracking-tight text-sm">{t.author}</h4>
                  <p className="text-industrial-blue text-[10px] font-bold uppercase tracking-widest leading-tight">{t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
