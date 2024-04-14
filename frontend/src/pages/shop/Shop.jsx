/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import Card from "../../components/card/Card";
import Footer from "../../components/footer/Footer";
import ShopBackground from "./shopBackground";
import Search from "../../components/search/Search";
import BreadCrumbs from "../../components/breadcrumbs/BreadCrumbs";
import Categories from "../../components/categories/Categories";
import ProductModal from "../../components/productModal/ProductModal";
import PageSelector from "./PageSelector";
import { GeneralContext } from "../../app/App";

export default function Shop() {
  const { setLoader } = useContext(GeneralContext);

  const [isOpen, setIsOpen] = useState(false);

  const [products, setProducts] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [categories, setCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");

  const [selectedPriceRange, setSelectedPriceRange] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 8;

  const indexOfLastProduct = currentPage * productsPerPage;

  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const [selectedProductId, setSelectedProductId] = useState(null);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory ? product.category === selectedCategory : true) &&
      (selectedPriceRange
        ? (([min, max]) => product.price >= min && product.price <= max)(
            selectedPriceRange.split("-").map(Number)
          )
        : true)
  );

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  useEffect(() => {
    setLoader(true);
    fetch(`http://localhost:5555/products`, {
      credentials: "include",
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        const uniqueCategories = new Set(
          data.map((product) => product.category)
        );
        setCategories([...uniqueCategories]);
        setLoader(false);
      });
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchTerm("");
    setSelectedPriceRange("");
    setCurrentPage(1);
  };

  const handlePriceChange = (priceRange) => {
    setSelectedPriceRange(priceRange);
    setSearchTerm("");
    setSelectedCategory("");
    setCurrentPage(1);
  };

  const resetFilter = () => {
    setSearchTerm("");
    setSelectedPriceRange("");
    setSelectedCategory("");
    setCurrentPage(1);
  };

  const handleCardClick = (productId) => {
    setSelectedProductId(productId);
    setIsOpen(true);
  };
  return (
    <>
      <ShopBackground />
      <Search
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
      <BreadCrumbs
        selectedCategory={selectedCategory}
        selectedPrice={selectedPriceRange}
      />
      <div className="flex flex-row min-h-screen justify-center items-start mt-3">
        <Categories
          categories={categories}
          onCategorySelect={handleCategoryChange}
          onPriceSelect={handlePriceChange}
          onReset={resetFilter}
        />
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 w-12/12 sm:w-10/12 mt-1">
          {currentProducts.map((product) => (
            <Card
              key={product._id}
              name={product.name}
              description={product.description}
              price={product.price}
              imageName={product.imageName}
              imageCount={product.imageCount}
              category={product.category}
              company={product.company}
              isOpen={isOpen}
              onCardClick={handleCardClick}
              _id={product._id}
            />
          ))}
        </section>
      </div>
      <PageSelector
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <ProductModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        productId={selectedProductId}
        products={products}
      />
      <Footer />
    </>
  );
}
