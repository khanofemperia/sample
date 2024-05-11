"use client";

import { CreateProductAction } from "@/actions/create-product";
import AlertMessage from "@/components/shared/AlertMessage";
import { capitalizeFirstLetter, isValidRemoteImage } from "@/libraries/utils";
import { FormEvent, useState, useEffect, useRef } from "react";
import Spinner from "@/elements/Spinners/white";
import { useOverlayStore } from "@/zustand/admin/overlayStore";
import { useNavbarMenuStore } from "@/zustand/admin/navbarMenuStore";
import { ArrowLeftIcon, ChevronDownIcon, CloseIcon } from "@/icons";
import clsx from "clsx";
import Image from "next/image";

export function NewProductButton() {
  const { showOverlay } = useOverlayStore();
  const { setNavbarMenu } = useNavbarMenuStore();

  const { pageName, overlayName } = useOverlayStore((state) => ({
    pageName: state.pages.products.name,
    overlayName: state.pages.products.overlays.newProduct.name,
  }));

  const openOverlay = () => {
    setNavbarMenu(false);
    showOverlay({ pageName, overlayName });
  };

  return (
    <button
      type="button"
      className="h-9 w-[calc(100%-10px)] mx-auto px-4 rounded-md flex items-center cursor-pointer transition duration-300 ease-in-out active:bg-lightgray"
      onClick={openOverlay}
    >
      New product
    </button>
  );
}

export function NewProductOverlay() {
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Select");
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [formData, setFormData] = useState({
    category: "",
    name: "",
    slug: "",
    price: "",
    poster: "",
  });

  const categoryRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const { hideOverlay } = useOverlayStore();

  const { pageName, isOverlayVisible, overlayName } = useOverlayStore(
    (state) => ({
      pageName: state.pages.products.name,
      overlayName: state.pages.products.overlays.newProduct.name,
      isOverlayVisible: state.pages.products.overlays.newProduct.isVisible,
    })
  );

  useEffect(() => {
    if (isOverlayVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }

    return () => {
      document.body.style.overflow = "visible";
    };
  }, [isOverlayVisible]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!categoryRef.current || !(event.target instanceof Node)) {
        return;
      }

      const targetNode = categoryRef.current as Node;

      if (!targetNode.contains(event.target)) {
        setIsCategoryDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsCategoryDropdownOpen(false);

    setFormData((prevData) => ({
      ...prevData,
      category: capitalizeFirstLetter(category),
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

   if (!formData.category || formData.category.toLowerCase() === "select") {
     setAlertMessage("Select a category");
     setShowAlert(true);
     return;
   } else if (!isValidRemoteImage(formData.poster)) {
     setAlertMessage(
       "Invalid poster URL. Try an image from Pinterest or your Firebase Storage."
     );
     setShowAlert(true);
     return;
   }

    setLoading(true);

    try {
      const message = await CreateProductAction(formData);
      setAlertMessage(message);
      setShowAlert(true);
    } catch (error) {
      console.error(error);
      setAlertMessage("Failed to create product");
      setShowAlert(true);
    } finally {
      setLoading(false);
      onHideOverlay();
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "poster") {
      setFormData((prevData) => ({
        ...prevData,
        poster: value,
      }));
    }
  };

  const onHideOverlay = () => {
    setLoading(false);
    hideOverlay({ pageName, overlayName });
    setSelectedCategory("Select");
    setFormData({
      category: "",
      name: "",
      slug: "",
      price: "",
      poster: "",
    });
  };

  const hideAlertMessage = () => {
    setShowAlert(false);
    setAlertMessage("");
  };

  return (
    <>
      {isOverlayVisible && (
        <div className="fixed top-0 bottom-0 left-0 right-0 z-50 bg-glass-black backdrop-blur-sm md:overflow-x-hidden md:overflow-y-visible md:custom-scrollbar">
          <div className="absolute bottom-0 left-0 right-0 w-full h-[calc(100%-60px)] rounded-t-3xl overflow-hidden bg-white md:w-[500px] md:rounded-2xl md:shadow-lg md:h-max md:mx-auto md:mt-20 md:mb-[50vh] md:relative md:bottom-auto md:left-auto md:right-auto md:top-auto md:-translate-x-0">
            <form onSubmit={handleSubmit}>
              <div className="w-full h-[calc(100vh-188px)] md:h-auto">
                <div className="md:hidden flex items-end justify-center pt-4 pb-2 absolute top-0 left-0 right-0 bg-white">
                  <div className="relative flex justify-center items-center w-full h-7">
                    <h2 className="font-semibold text-lg">New product</h2>
                    <button
                      onClick={onHideOverlay}
                      type="button"
                      className="w-7 h-7 rounded-full flex items-center justify-center absolute right-4 transition duration-300 ease-in-out bg-lightgray active:bg-lightgray-dimmed"
                    >
                      <CloseIcon size={18} />
                    </button>
                  </div>
                </div>
                <div className="hidden md:flex md:items-center md:justify-between py-2 pr-4 pl-2">
                  <button
                    onClick={onHideOverlay}
                    type="button"
                    className="h-9 px-3 rounded-full flex items-center gap-1 transition duration-300 ease-in-out active:bg-lightgray"
                  >
                    <ArrowLeftIcon className="fill-custom-blue" size={18} />
                    <span className="font-semibold text-sm text-custom-blue">
                      New product
                    </span>
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className={clsx(
                      "relative h-9 w-max px-4 rounded-full overflow-hidden transition duration-300 ease-in-out text-white bg-custom-blue",
                      {
                        "bg-opacity-50": loading,
                        "active:bg-custom-blue-dimmed": !loading,
                      }
                    )}
                  >
                    {loading ? (
                      <div className="flex gap-1 items-center justify-center w-full h-full">
                        <Spinner />
                        <span className="text-white">Saving</span>
                      </div>
                    ) : (
                      <span className="text-white">Save</span>
                    )}
                  </button>
                </div>
                <div className="w-full h-full mt-[52px] md:mt-0 px-5 pt-5 pb-28 md:pb-10 flex flex-col gap-5 overflow-x-hidden overflow-y-visible invisible-scrollbar md:overflow-hidden">
                  <div className="flex flex-col gap-2">
                    <h2 className="font-semibold text-sm">Category</h2>
                    <div ref={categoryRef} className="w-full h-9 relative">
                      <button
                        onClick={() =>
                          setIsCategoryDropdownOpen((prevState) => !prevState)
                        }
                        type="button"
                        className="h-9 w-full px-3 rounded-md flex items-center justify-between transition duration-300 ease-in-out bg-lightgray active:bg-lightgray-dimmed"
                      >
                        <span
                          className={clsx({
                            "text-gray": selectedCategory === "Select",
                          })}
                        >
                          {selectedCategory}
                        </span>
                        <ChevronDownIcon
                          className="-mr-[4px] stroke-gray"
                          size={20}
                        />
                      </button>
                      <div
                        className={clsx("w-full absolute top-10 z-10", {
                          hidden: !isCategoryDropdownOpen,
                          block: isCategoryDropdownOpen,
                        })}
                      >
                        <div className="overflow-hidden h-full w-full py-[6px] flex flex-col gap-0 rounded-md shadow-dropdown bg-white">
                          {categories.map((category, index) => (
                            <div
                              key={index}
                              className="w-full h-9 flex items-center px-[12px] cursor-context-menu transition duration-300 ease-in-out hover:bg-lightgray"
                              onClick={() =>
                                handleCategorySelect(category.name)
                              }
                            >
                              {category.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="font-semibold text-sm">
                      Name
                    </label>
                    <div className="w-full h-9 relative">
                      <input
                        type="text"
                        name="name"
                        placeholder="Denim Mini Skirt"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full h-9 px-3 rounded-md transition duration-300 ease-in-out border focus:border-custom-blue"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="slug" className="font-semibold text-sm">
                      Slug
                    </label>
                    <div className="w-full h-9 relative">
                      <input
                        type="text"
                        name="slug"
                        placeholder="denim-mini-skirt"
                        value={formData.slug}
                        onChange={handleInputChange}
                        className="w-full h-9 px-3 rounded-md transition duration-300 ease-in-out border focus:border-custom-blue"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="price" className="font-semibold text-sm">
                      Price
                    </label>
                    <div className="w-full h-9 relative">
                      <input
                        type="text"
                        name="price"
                        placeholder="34.99"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="w-full h-9 px-3 rounded-md transition duration-300 ease-in-out border focus:border-custom-blue"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="poster" className="font-semibold text-sm">
                      Poster
                    </label>
                    <div>
                      <div className="w-full max-w-[383px] border rounded-md overflow-hidden">
                        <div className="w-full aspect-square flex items-center justify-center overflow-hidden">
                          {formData.poster &&
                            isValidRemoteImage(formData.poster) && (
                              <Image
                                src={formData.poster}
                                alt={formData.name || "Poster"}
                                width={383}
                                height={383}
                                priority
                              />
                            )}
                        </div>
                        <div className="w-full h-9 border-t overflow-hidden">
                          <input
                            type="text"
                            name="poster"
                            placeholder="Paste image URL"
                            value={formData.poster}
                            onChange={handleInputChange}
                            className="h-full w-full px-3 text-gray"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:hidden w-full pb-5 pt-2 px-5 absolute bottom-0">
                <button
                  type="submit"
                  disabled={loading}
                  className={clsx(
                    "relative h-12 w-full rounded-full overflow-hidden transition duration-300 ease-in-out text-white bg-custom-blue",
                    {
                      "bg-opacity-50": loading,
                      "active:bg-custom-blue-dimmed": !loading,
                    }
                  )}
                >
                  {loading ? (
                    <div className="flex gap-1 items-center justify-center w-full h-full">
                      <Spinner />
                      <span className="text-white">Saving</span>
                    </div>
                  ) : (
                    <span className="text-white">Save</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showAlert && (
        <AlertMessage
          message={alertMessage}
          hideAlertMessage={hideAlertMessage}
        />
      )}
    </>
  );
}
